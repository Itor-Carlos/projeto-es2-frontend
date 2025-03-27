import React from 'react';
import Carousel from '../../components/Carousel/index';
import './Homepage.css';

export const Homepage = () => {
  const carouselItems = [
    { title: 'Funcionários', path: '/funcionario/listar' },
    { title: 'Fornecedores', path: '/fornecedor/listar' },
    { title: 'Clientes', path: '/cliente/listar' },
    { title: 'Áreas', path: '/area/listar' },
    { title: 'Produtos', path: '/grao/listar' },
    { title: 'Pedidos', path: '/pedidos' }
  ];

  return (
    <div className="homepage-container">
        <div className="main-content">
            <div className="banner">
            </div>

            <Carousel items={carouselItems} />
        </div>
    </div>
  );
};
