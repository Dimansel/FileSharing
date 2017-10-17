import os.path
from tornado import web
from constants import FILES_PATH


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
