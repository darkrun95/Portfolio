from django.core.management.base import BaseCommand
import os

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        os.system("rm -rf static/frontend/bundles/prod/*")
        os.system("cd frontend && node_modules/.bin/webpack --config webpack.prod.config.js --progress --colors")
