from tornado import web


class IndexHandler(web.RequestHandler):
    def get(self):
        self.redirect('/files')

    def post(self):
        self.get()
