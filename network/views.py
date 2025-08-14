from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.contrib.auth.decorators import login_required

from .models import *

def index(request):

    return render(request,'network/index.html',{
        "all_posts": Post.objects.order_by('-post_creation_date')
    })


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


@login_required
def new_post(request):
    if request.method == "POST":
        post_creator = request.user
        post_content = request.POST['post-content']

        Post.objects.create(post_creator = post_creator , post_content=post_content)
        print(post_creator)
        return redirect(index)
        
    else:
        return render(request,'network/newpost.html')
    

def profile_page(request,username):
    user = User.objects.get(username=username)
    is_following = request.user.following.filter(username=user.username).exists()
    return render(request,'network/profilepage.html',{
        'profile':user,
        'following_count':user.following.count(),
        'followers_count':user.followers.count(),
        'all_posts': user.posts.order_by('-post_creation_date'),
        'is_following':is_following
    })


@login_required
def follow(request,username):
    if request.method == "POST":
        user_to_follow = get_object_or_404(User, username=username)
        request.user.following.add(user_to_follow)
    
        return JsonResponse({"message": "Followed successfully",})
    
    return JsonResponse({"error": "Method not allowed"}, status=405)


@login_required
def unfollow(request,username):
    if request.method == "POST":
        user_to_unfollow = get_object_or_404(User, username=username)
        request.user.following.remove(user_to_unfollow)
    
        return JsonResponse({"message": "unFollowed successfully"})
    
    return JsonResponse({"error": "Method not allowed"}, status=405)

