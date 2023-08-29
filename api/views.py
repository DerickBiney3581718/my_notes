from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializer
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)

@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated')
    serialized_notes = NoteSerializer(notes, many = True)
    # print(type(serialized_notes))
    return Response(serialized_notes.data)

@api_view(['GET'])
def getNote(request,pk):
    notes = Note.objects.get(pk = pk)
    serialized_notes = NoteSerializer(notes)
    # print(type(serialized_notes))
    return Response(serialized_notes.data)

@api_view(['PUT'])
def updateNote(request, pk):
    note = Note.objects.get(pk = pk)
    data = request.data
    
    serializer = NoteSerializer(instance=note, data= data)
    if serializer.is_valid():
        serializer.save()
        
    return Response(serializer.data)


@api_view(['DELETE'])
def deleteNote(request, pk):
    note = Note.objects.get(pk = pk)
    note.delete()
    return Response('deleted')

@api_view(['POST'])
def createNote(request):
    data = request.data
    print(data)
    serializer = NoteSerializer(data= data)
    if serializer.is_valid():
        serializer.save()
        # print('vla', **serializer.validated_data)
        # Note.objects.create(**serializer.validated_data)
        
    return Response('Note created')