package com.on5Aug.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.on5Aug.entity.Todo;
import com.on5Aug.repo.TodoRepository;
import com.on5Aug.services.MarkdownService;
import com.on5Aug.services.TodoService;

@Service
public class TodoServiceImpl implements TodoService{
	
	@Autowired
	private TodoRepository repository;
	
	@Autowired
	private MarkdownService markdownService;

	@Override
	public Todo saveTodo(Todo todo) {
		return repository.save(todo);
	}

	@Override
	public void deleteTodo(Todo todo) {
		repository.delete(todo);
		
	}

	@Override
	public Todo findById(Long id) {
		return repository.findById(id).orElseThrow(()-> new RuntimeException("Todo not found!"));
	}

	@Override
	public List<Todo> getAllTodos() {
		List<Todo> all = repository.findAll();
		for (Todo todo : all) {
			todo.setDescription(markdownService.convertToHtml(todo.getDescription()));
		}
		
		return all;
	}

}
