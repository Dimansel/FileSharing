import os
import os.path
import json
from tornado import web
from constants import FILES_PATH


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

        entries_html = ''

        if local_path:
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
