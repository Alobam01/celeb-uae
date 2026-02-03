from django.shortcuts import render

# Create your views here.
def myindex(request):
    return render(request, 'index/index.html')