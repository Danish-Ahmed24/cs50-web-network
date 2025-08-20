
from os import name
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path('newPost',views.new_post,name="newPost"),
    path('profilePage/<str:username>',views.profile_page,name="profilePage"),
    path('follow/<str:username>',views.follow,name="follow"),
    path('unfollow/<str:username>',views.unfollow,name="unfollow"),
    path('following',views.following,name="following"),
    path('edit_post/<int:id>',views.edit_post,name="editPost"),
    path('like/<int:id>',views.like,name="like")
]
 