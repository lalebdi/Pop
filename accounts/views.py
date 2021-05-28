from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm

# Create your views here. Consider using authenticate with the login/ logout


def login_view(request, *args, **kwargs):
    form = AuthenticationForm(request, data=request.POST or None)   # This is standard
    if form.is_valid():
        user_ = form.get_user()
        login(request, user_)
        return redirect("/")
    context = {
        "form": form,
        "btn_label": "Login",
        "title": "Login"
        }
    return render(request, "accounts/auth.html", context)


def logout_view(request, *args, **kwargs):
    if request.method == "POST":
        logout(request)
        return redirect("/login")
    context = {
        "form": None,
        "description": "Are you sure you want to logout?",
        "btn_label": "Click logout to confirm",
        "title": "Logout"
        }
    return render(request, "accounts/auth.html", context)


def register_view(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)   
    if form.is_valid():
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))
        # Need to send confirmation email
        login(request, user)
        return redirect("/")
        # print(form.cleaned_data)
        # username = form.cleaned_data.get("username")
    context = {
        "form": form,
        "btn_label": "Register",
        "title": "Register"
        }
    return render(request, "accounts/auth.html", context)