from django.urls import path
from .views import getRoutes, getNotes, getNote, updateNote, deleteNote, createNote
# url patterns

urlpatterns = [
    path('', getRoutes, name="routes"),
    path('notes/', getNotes, name="notes"),
    path('notes/<str:pk>/update', updateNote, name="note-update"),
    path('notes/<str:pk>/delete', deleteNote, name="note-delete"),
    path('notes/new', createNote, name="note-create"),
    path('notes/<int:pk>/', getNote, name="note"),
    

]
