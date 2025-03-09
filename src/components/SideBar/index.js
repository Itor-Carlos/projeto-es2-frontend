import { useEffect, useRef } from 'react';
import './styles.css';
import logo from '../../assets/logo.jpg';
import { Link } from 'react-router-dom';

export const SideBar = () => {
    const sidebarRef = useRef(null);

    const handleMenuClick = (event) => {
        const menuItem = event.currentTarget.closest('.menu-item');

        if (menuItem) {
            menuItem.classList.toggle('expanded');
            menuItem.classList.toggle('active');            
            
            const submenu = event.currentTarget.nextElementSibling;
            if (submenu && submenu.classList.contains('submenu')) {
                submenu.classList.toggle('open');
            }
        }
    };

    const handleSubmenuItemClick = (event) => {
        const allSubmenuItems = sidebarRef.current.querySelectorAll('.submenu-item');
        allSubmenuItems.forEach(item => {
            item.classList.remove('active');
        });
        
        event.currentTarget.classList.add('active');
    };

    useEffect(() => {
        if (!sidebarRef.current) return;

        const allMenuHeaders = sidebarRef.current.querySelectorAll('.menu-header');
        
        allMenuHeaders.forEach(subMenu => {
            subMenu.addEventListener('click', handleMenuClick);
        });

        const allSubmenuItems = sidebarRef.current.querySelectorAll('.submenu-item');
        allSubmenuItems.forEach(item => {
            item.addEventListener('click', handleSubmenuItemClick);
        });
        
        return () => {
            allMenuHeaders.forEach(subMenu => {
                subMenu.removeEventListener('click', handleMenuClick);
            });

            allSubmenuItems.forEach(item => {
                item.removeEventListener('click', handleSubmenuItemClick);
            });
        };
    }, []); 

    return (
        <div className="sidebar" ref={sidebarRef}>
            <div className="sidebar-header">
                <img alt="logo da fazenda" className="logo" src={logo} />
            </div>
            <ul className="sidebar-menu">
                <li className="menu-item">
                    <div className="menu-header">
                        <span>Funcionários</span>
                        <span className="arrow">▲</span>
                    </div>
                    <ul className="submenu">
                        <li><a href="#" className="submenu-item">Cadastrar Funcionário</a></li>
                        <li><a href="#" className="submenu-item">Listar Funcionário</a></li>
                        <li><a href="#" className="submenu-item">Alocar Cargo</a></li>
                        <li><a href="#" className="submenu-item">Alocar Tarefa</a></li>
                    </ul>
                </li>

                <li className="menu-item">
                    <div className="menu-header">
                        <span>Fornecedores</span>
                        <span className="arrow">▲</span>
                    </div>
                    <ul className="submenu">
                        <li><a href="#" className="submenu-item">Cadastrar Fornecedor</a></li>
                        <li><a href="#" className="submenu-item">Listar Fornecedores</a></li>
                    </ul>
                </li>

                <li className="menu-item">
                    <div className="menu-header">
                        <span>Clientes</span>
                        <span className="arrow">▲</span>
                    </div>
                    <ul className="submenu">
                        <li><a href="#" className="submenu-item">Cadastrar Clientes</a></li>
                        <li><a href="#" className="submenu-item">Listar Clientes</a></li>
                    </ul>
                </li>

                <li className="menu-item">
                    <div className="menu-header">
                        <span>Áreas</span>
                        <span className="arrow">▲</span>
                    </div>
                    <ul className="submenu">
                        <li><Link to="/area/cadastrar_area/" className="submenu-item">Cadastrar Áreas</Link></li>
                        <li><a href="#" className="submenu-item">Listar Áreas</a></li>
                    </ul>
                </li>

                <li className="menu-item">
                    <div className="menu-header">
                        <span>Produtos</span>
                        <span className="arrow">▲</span>
                    </div>
                    <ul className="submenu">
                        <li className="menu-item nested">
                            <div className="menu-header">
                                <span>Grão</span>
                                <span className="arrow">▲</span>
                            </div>
                            <ul className="submenu">
                                <li><a href="#" className="submenu-item">Cadastrar Grão</a></li>
                                <li><a href="#" className="submenu-item">Listar Grão</a></li>
                            </ul>
                        </li>

                        <li className="menu-item nested">
                            <div className="menu-header">
                                <span>Fertilizante</span>
                                <span className="arrow">▲</span>
                            </div>
                            <ul className="submenu">
                                <li><a href="#" className="submenu-item">Cadastrar Fertilizante</a></li>
                                <li><a href="#" className="submenu-item">Listar Fertilizante</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>

                <li className="menu-item">
                    <div className="menu-header">
                        <span>Safra</span>
                        <span className="arrow">▲</span>
                    </div>
                    <ul className="submenu">
                        <li><a href="#" className="submenu-item">Cadastrar Safra</a></li>
                        <li><a href="#" className="submenu-item">Listar Safra</a></li>
                    </ul>
                </li>

                <li className="menu-item">
                    <div className="menu-header">
                        <span>Pedidos</span>
                        <span className="arrow">▲</span>
                    </div>
                    <ul className="submenu">
                        <li><a href="#" className="submenu-item">Cadastrar Pedido Cliente</a></li>
                        <li><a href="#" className="submenu-item">Listar Pedidos Cliente</a></li>
                        <li><a href="#" className="submenu-item">Cadastrar Pedido Fornecedor</a></li>
                        <li><a href="#" className="submenu-item">Listar Pedidos Fornecedor</a></li>
                    </ul>
                </li>

                <li className="menu-item">
                    <div className="menu-header">
                        <span>Cargo</span>
                        <span className="arrow">▲</span>
                    </div>
                    <ul className="submenu">
                        <li><a href="#" className="submenu-item">Cadastrar Cargo</a></li>
                        <li><a href="#" className="submenu-item">Alocar Cargo</a></li>
                    </ul>
                </li>

                <li className="menu-item">
                    <div className="menu-header">
                        <span>Tarefa</span>
                        <span className="arrow">▲</span>
                    </div>
                    <ul className="submenu">
                        <li><a href="#" className="submenu-item">Cadastrar Tarefa</a></li>
                        <li><a href="#" className="submenu-item">Listar Tarefas</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};