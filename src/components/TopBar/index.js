import './styles.css';
import { useNavigate } from 'react-router-dom';

export const TopBar = ({entity, useCase, redirectRoute, textButton}) => {

    const navigate = useNavigate();

    return (
        <div className="top-bar">
            <div className="breadcrumb">
                {entity} / <span className="breadcrumb-active">{useCase}</span>
            </div>
            {redirectRoute && textButton && <button className="btn btn-primary" onClick={() => navigate(redirectRoute)}>{textButton}</button>}
        </div>
    );
}