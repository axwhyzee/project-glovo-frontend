import './spinner.scss';

function Spinner() {
    return (
        <>
            <div className='spinner-wrapper'>
                <div className='spinner-planet'>
                    <div className='spinner-orbit'></div>
                </div>
            </div>
            <div className='overlay'></div>
        </>
    )
}

export default Spinner;