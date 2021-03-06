import styled from '@emotion/styled';
import { css } from '@emotion/react';
// import PropTypes from 'prop-types'

export const Flex = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
    margin: ${props => props.margin};
    padding: ${props => props.padding};
    fill: ${props => props.fill};
    margin-left: ${props => props.marginLeft};
    display: flex;
    flex-wrap: ${props => {
        if (props.wrapReverse) return 'wrap-reverse';
        else if (props.noWrap) return 'nowrap';
        return 'wrap';
    }};
    justify-content: ${props => {
        if (props.justifyContent) return props.justifyContent;
        if (props.justifyCenter) return 'center';
        else if (props.justifyAround) return 'space-around';
        else if (props.justifyEvenly) return 'space-evenly';
        else if (props.justifyBetween) return 'space-between';
        else if (props.justifyEnd) return 'flex-end';
        return 'flex-start';
    }};
    align-items: ${props => {
        if (props.alignItems) return props.alignItems;
        else if (props.alignStretch) return 'stretch';
        else if (props.alignEnd) return 'flex-end';
        if (props.alignCenter) return 'center';
        else if (props.alignBaseline) return 'baseline';
        return 'flex-start';
    }};
    align-content: ${props => {
        if (props.alignContent) return props.content;
        else if (props.contentStart) return 'flex-start';
        else if (props.contentEnd) return 'flex-end';
        else if (props.contentCenter) return 'center';
        else if (props.contentBetween) return 'space-between';
        else if (props.contentAround) return 'contentAround';
        return 'stretch';
    }};
    flex-direction: ${props => (props.column ? 'column' : 'row')};
    background: ${props => props.background};
    ${props => props.hover && css`
    &:hover {
        border-radius: 6px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.85);
        border: 1.5px solid #2b89f3;
      }
`}
`;

export const Column = styled.div`
    width: ${props => {
        if (props.three) return '33.33%';
        if (props.four) return '25%';
        return '50%';
    }};
    padding: ${props => (props.noPadding ? 0 : '15px')}};
`;

export default Flex;