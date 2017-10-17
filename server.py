import os
import os.path
import json
from tornado import web, ioloop
import IndexHandler
import BrowseHandler
import DownloadHandler


app = web.Application([
    (r'/', IndexHandler.IndexHandler),
    (r'/(favicon.ico)', web.StaticFileHandler, {'path': 'app/img/'}),
    (r'/css/(.*)', web.StaticFileHandler, {'path': 'app/css/'}),
    (r'/fonts/(.*)', web.StaticFileHandler, {'path': 'app/fonts/'}),
    (r'/img/(.*)', web.StaticFileHandler, {'path': 'app/img/'}),
    (r'/js/(.*)', web.StaticFileHandler, {'path': 'app/js/'}),
    (r'/files', BrowseHandler.BrowseHandler),
    (r'/download/(.+)', DownloadHandler.DownloadHandler)
])


if __name__ == '__main__':
    print(">>>> File exchanger web server <<<<")
    app.listen(1488)
    ioloop.IOLoop.instance().start()
