from django.core.management.base import BaseCommand
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User

class Command(BaseCommand):
    def handle(self,*args,**kwargs):
        print("This command will create superuser with username admin and password as admin")
        try:
            admin = User.objects.get(username='admin')
            print('Superuser admin with password admin already exists.')
        except ObjectDoesNotExist:
            admin = User.objects.create(username='admin',email='admin@admin.com')
            admin.set_password('admin')
            admin.is_staff=True
            admin.is_superuser = True
            admin.save()
            print('Superuser admin with password admin created.')