import './styles.css';
export const TopBar = ({entity, useCase}) => {
    return (
        <div className="top-bar">
            <div className="breadcrumb">
                {entity} / <span className="breadcrumb-active">{useCase}</span>
            </div>
        </div>
    );
}