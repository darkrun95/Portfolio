from django.core.management.base import BaseCommand
import os

class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('branch', nargs='+', type=str)
        parser.add_argument('message', nargs='+', type=str)
        parser.add_argument('deploy', nargs='+', type=bool)

    def handle(self, *args, **kwargs):
        os.system("rm -rf static/frontend/bundles/prod/*")
        os.system("cd frontend && node_modules/.bin/webpack --config webpack.prod.config.js --progress --colors")
        print("Production build prepared")
        print()

        os.system("git add -A")
        os.system("git commit -am {}".format(kwargs['message'][0]))
        os.system("git push origin {}".format(kwargs['branch'][0]))
        print("Pushed to git on branch {}".format(kwargs['branch'][0]))
        print()

        print(kwargs)
        if kwargs['deploy'] == True:
            os.system("eb deploy Arunpottekat-env --profile arunpottekat")
            print("Production deployment complete")
        else:
            print("Deployment cancelled")