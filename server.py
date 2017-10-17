import os
import os.path
import json
from tornado import web, ioloop


FILES_PATH = '/home/elliptic/public_access/'


class IndexHandler(web.RequestHandler):
    def get(self):
        self.redirect('/files')

    def post(self):
        self.get()


class DownloadHandler(web.RequestHandler):
    chunk_size = 256 * 1024

    
    async def get(self, uri):
        await self.post(uri)
        return

    async def post(self, uri):
        local_path = '/' + uri
        path = FILES_PATH + local_path

        if not os.path.exists(path):
            raise web.HTTPError(404)

        path = os.path.normpath(path)
        if not path.startswith(FILES_PATH):
            raise web.HTTPError(400)

        if os.path.isfile(path):
            self.set_header('Content-Type', 'application/octet-stream')
            self.set_header('Content-Disposition', 'attachment; filename=' + path.split('/')[-1])

            data = self.get_buf(path)
            for i in range(0, len(data), self.chunk_size):
                self.write(bytes(data[i:i + self.chunk_size]))
                await self.flush()
            self.finish()
            return
        else:
            raise web.HTTPError(400)

    def get_buf(self, path):
        buf = bytearray(os.path.getsize(path))
        with open(path, 'rb') as f:
            f.readinto(buf)
        return buf


class BrowseHandler(web.RequestHandler):
    INDEX = open('app/index.html', 'r').read()
    FILEITEM = open('app/item-template.html').read()
    ONCLICK = 'onclick="goTo(\'{}\')"'
    DOWNLOAD_ICON = '<a href="{}"><i class="fa fa-download"></i></a>'


    async def get(self):
        await self.send_response(True)
        return

    async def post(self):
        await self.send_response(False)
        return

    async def send_response(self, GET):
        if GET:
            entries_html = self.get_entries_html(FILES_PATH, '')
            self.finish(self.INDEX.format(entries_html))
            return

        local_path = self.get_body_argument('path', '')
        path = FILES_PATH + local_path

        if not os.path.exists(path):
            resp = {'error': True, 'html': None, 'error_msg': 'The directory does not exist'}
            self.finish(json.dumps(resp))

        path = os.path.normpath(path)
        if not (path + '/').startswith(FILES_PATH):
            path = FILES_PATH
            local_path = ''

        if os.path.isdir(path):
            entries_html = self.get_entries_html(path, local_path)
            resp = {'error': False, 'html': entries_html}
            self.finish(json.dumps(resp))

        else:
            resp = {'error': True, 'html': None, 'error_msg': 'The location is forbidden'}
            self.finish(json.dumps(resp))

    def get_entries_html(self, path, local_path):
        local_path = os.path.normpath(local_path)
        if local_path == '.':
            local_path = ''
        parent = os.path.join(local_path, '..')
        entries_html = self.FILEITEM.format(onclick=self.ONCLICK.format(parent), itype='folder', content='..', download='')
        for (dirpath, dirnames, filenames) in os.walk(path):
            for dirname in dirnames:
                act = self.ONCLICK.format(os.path.join(local_path, dirname))
                entries_html += self.FILEITEM.format(onclick=act, itype='folder', content=dirname, download='')
            for filename in filenames:
                link = os.path.join('download', local_path, filename)
                download_link = self.DOWNLOAD_ICON.format(link)
                entries_html += self.FILEITEM.format(onclick='', itype='file', content=filename, download=download_link)
            break

        return entries_html


app = web.Application([
    (r'/', IndexHandler),
    (r'/(favicon.ico)', web.StaticFileHandler, {'path': 'app/img/'}),
    (r'/css/(.*)', web.StaticFileHandler, {'path': 'app/css/'}),
    (r'/fonts/(.*)', web.StaticFileHandler, {'path': 'app/fonts/'}),
    (r'/img/(.*)', web.StaticFileHandler, {'path': 'app/img/'}),
    (r'/js/(.*)', web.StaticFileHandler, {'path': 'app/js/'}),
    (r'/files', BrowseHandler),
    (r'/download/(.+)', DownloadHandler)
])


if __name__ == '__main__':
    print(">>>> File exchanger web server <<<<")
    app.listen(1488)
    ioloop.IOLoop.instance().start()
