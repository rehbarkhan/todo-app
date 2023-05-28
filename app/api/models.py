from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

def validate_item_state(value):
    if value not in ['OPEN','CLOSE']:
        raise ValidationError 

class TodoModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=50)
    description = models.TextField()
    status = models.CharField(max_length=50,default='OPEN',validators=[validate_item_state])
    user = models.ForeignKey(User,related_name='item_created_by',on_delete=models.CASCADE)

    def __str__(self):
        return str(self.title)

    @property
    def user_name(self):
        return self.user.username
