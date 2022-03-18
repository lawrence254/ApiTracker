import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Navigation = () => {
    return (
        <div className="pageButtons">
            <div className="add">
                <a className='button' href='/add-key'><FontAwesomeIcon className='addCircle' icon={['fas', 'plus-circle']} size='2x' />Add New API Key</a>
            </div>
            <div className="view">
                <a className='button' href='/my-apis'><FontAwesomeIcon className='viewSearch' icon={['fas', 'search']} size='2x' />View My API Keys</a>
            </div>
        </div>
    )
};
export default Navigation;

export const NavBar =()=>{
    return (
        <div className="backNav">
            <a className='back-button' href='/'><FontAwesomeIcon icon={['fas', 'home']} size='2x' /></a>
        </div>
    )
}