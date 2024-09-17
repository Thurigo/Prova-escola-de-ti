"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Receita {
  id: number;
  name: string;
  time: number;
  cost: number;
}

export default function CrudPage() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [formData, setFormData] = useState({ name: '', time: 0, cost: 0 });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchReceitas();
  }, []);

  const fetchReceitas = async () => {
    const response = await axios.get('http://localhost:3001/receitas');
    console.log(response.data);  // Verifique a resposta da API no console
    setReceitas(Array.isArray(response.data) ? response.data : []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:3001/receitas/${editId}`, formData);
    } else {
      await axios.post('http://localhost:3001/receitas', formData);
    }
    setFormData({ name: '', time: 0, cost: 0 });
    setEditId(null);
    fetchReceitas();
  };

  const handleEdit = (id: number) => {
    const receita = receitas.find((r) => r.id === id);
    if (receita) {
      setFormData(receita);
      setEditId(id);
    }
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:3001/receitas/${id}`);
    fetchReceitas();
  };

  return (
    <div>
      <h1>Gerenciamento de Receitas</h1>

      {/* Formulário de Receita */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Tempo"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Custo"
          value={formData.cost}
          onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
        />
        <button type="submit">{editId ? 'Atualizar' : 'Criar'}</button>
      </form>

      {/* Lista de Receitas */}
      <h2>Receitas</h2>
      {Array.isArray(receitas) && receitas.length > 0 ? (
        <ul>
          {receitas.map((receita) => (
            <li key={receita.id}>
              {receita.name} - {receita.time} min - R$ {receita.cost}{' '}
              <button onClick={() => handleEdit(receita.id)}>Editar</button>
              <button onClick={() => handleDelete(receita.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma receita disponível.</p>
      )}
    </div>
  );
}
