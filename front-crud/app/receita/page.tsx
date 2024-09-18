"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Receita {
  id: number;
  name: string;
  time: number;
  cost: number;
  // ingrediente: [{
  //   id: number
  //   name: string 
  // }];
}

export default function CrudPage() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [formData, setFormData] = useState({ name: '', time: 0, cost: 0,});
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchReceitas();
  }, []);

  const fetchReceitas = async () => {
    const response = await axios.get('http://localhost:3001/receitas');
    console.log(response.data);  
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
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.subtitle}>Gerenciamento de Receitas</h1>

        {/* Formulário de Receita NÃO CONSEGUI ARRUMAR ESSA JOÇA */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Nome da ReceitA"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={styles.input}
          />
        <h5 style={styles.subtitle}>Tempo da Receitas</h5>
          <input
            type="number"
            placeholder="Tempo"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: Number(e.target.value) })}
            style={styles.input}
          />
        <h5 style={styles.subtitle}>Custo da Receitas</h5>
          <input
            type="number"
            placeholder="Custo"
            value={formData.cost}
            onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
            style={styles.input}
          />
          <button type="submit" style={styles.button}>{editId ? 'Atualizar' : 'Criar'}</button>
        </form>

        {/* Lista de Receitas */}
        <h2 style={styles.subtitle}>Receitas</h2>
        {Array.isArray(receitas) && receitas.length > 0 ? (
          <ul style={styles.list}>
            {receitas.map((receita) => (
              <li key={receita.id} style={styles.listItem}>
                {receita.id} - {receita.name} - {receita.time} min - R$ {receita.cost.toFixed(2)} {' '}
                <button style={styles.editButton} onClick={() => handleEdit(receita.id)}>Editar</button>
                <button style={styles.deleteButton} onClick={() => handleDelete(receita.id)}>Excluir</button>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.subtitle}>Nenhuma receita disponível.</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px'
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
    color: 'black'
  },
  subtitle: {
    fontSize: '20px',
    fontColor:'black',
    marginBottom: '10px',
    color: 'black',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '20px'
  },
  input: {
  padding: '10px',
    fontSize: '16px',
    color: 'black',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: '0',
    color: 'black'
  },
  listItem: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontColor:"black",
  },
  editButton: {
    padding: '5px 10px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#dc3545',
    color: 'black',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  noData: {
    fontSize: '16px',
    color: 'black',
    textAlign: 'center',
  }
};
