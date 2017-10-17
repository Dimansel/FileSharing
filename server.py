import os
import os.path
from tornado import web, ioloop


class IndexHandler(web.RequestHandler):
    def get(self):
        self.redirect('/files')

    def post(self):
        self.get()


class BrowseHandler(web.RequestHandler):
    INDEX = open('app/index.html', 'r').read()
    FILEITEM = open('app/item-template.html').read()
    DOWNLOAD_ICON = '<a href="{}"><i class="fa fa-download"></i></a>'
    FILES_PATH = '/home/elliptic/public_access/'
    chunk_size = 256 * 1024


    def get_buf(self, path):
        buf = bytearray(os.path.getsize(path))
        with open(path, 'rb') as f:
            f.readinto(buf)
        return buf

    async def get(self, uri):
        if not uri:
            uri = '/'
        path = self.FILES_PATH + uri
        uri = uri.lstrip('/')
        if not uri.startswith('files'):
            uri = os.path.join('files', uri)
    
        if not os.path.exists(path):
            raise web.HTTPError(404)
    
        if os.path.isdir(path):
            parent = os.path.join(uri, '..')
            entries_html = self.FILEITEM.format(link='/' + parent, itype='folder', content='..', download='')
            for (dirpath, dirnames, filenames) in os.walk(path):
                for dirname in dirnames:
                    link = '/' + os.path.join(uri, dirname)
                    entries_html += self.FILEITEM.format(link=link, itype='folder', content=dirname, download='')
                for filename in filenames:
                    link = '/' + os.path.join(uri, filename)
                    download_link = self.DOWNLOAD_ICON.format(link)
                    entries_html += self.FILEITEM.format(link=link, itype='file', content=filename, download=download_link)
                break

            self.finish(self.INDEX.format(entries_html))
        elif os.path.isfile(path):
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

    async def post(self, uri):
        await self.get(uri)
        return


app = web.Application([
    (r'/', IndexHandler),
    (r'/(favicon.ico)', web.StaticFileHandler, {'path': 'app/img/'}),
    (r'/static/(.*)', web.StaticFileHandler, {'path': 'app/'}),
    (r'/files(/.*)?', BrowseHandler)
])


if __name__ == '__main__':
    print(">>>> File exchanger web server <<<<")
    app.listen(1488)
    ioloop.IOLoop.instance().start()
