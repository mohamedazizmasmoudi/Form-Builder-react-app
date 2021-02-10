import React from 'react';

const field = (props) => (
    <div>
        <h4>{props.count}. label: {props.optionText.label},
            name: {props.optionText.name},
            type: {props.optionText.type}
        </h4>
    </div>
);
export default field;