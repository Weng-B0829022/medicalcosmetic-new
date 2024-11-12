from django.views import View
from django.shortcuts import render
from django.http import JsonResponse

class Index(View):
    def get(self, request):
        return render(request, 'index.html')  # 使用模板目錄中的 index.html

