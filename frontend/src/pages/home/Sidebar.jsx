import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react'
import './home.scss';

function Sidebar() {
    const [toggle, SetToggle] = useState(true);

    return (
        <section className={'sidebar' + (toggle ? ' expanded' : '')}>
            <button className='toggle-sidebar' type='button' onClick={() => { SetToggle(!toggle) }}>
                <FontAwesomeIcon icon={toggle ? faCaretRight : faCaretLeft} />
            </button>
        </section>
    )
}

export default Sidebar;