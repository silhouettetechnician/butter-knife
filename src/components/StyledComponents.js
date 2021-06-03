import React from 'react'
import styled from "@emotion/styled/macro"
// import {css} from "@emotion/core"
// import styled from "@emotion/styled"

// export const Container = styled.section`
//         position: relative;
//         -webkit-calc(100vh - 212px);
//         height: calc(100vh - 212px);
//         width: 100%;
// `
export const DropDownBrands = styled.section`
        // display: none;
        // -webkit-calc(100% - 212px);
        height: calc(100vh -175px);
        position: ${props => props.open ? 'fixed' : 'absolute'};
        display: ${props => props.open ? 'block' : 'unset'};
        top: 140px;
        // bottom: 0;
        left: 0;
        // right: 0;
        width: 100%;
        transition: .5s ease;
        background-color: #fff;
        opacity: ${props => props.open ? '0.8' : '0'};
        z-index: ${props => props.open ? '500' : '0'};
        display: flex;
        justify-content: center;
        align-items: center;

`
export const Header = styled.header`
// ${console.log(dark, 'dark in styled')}
        font-size: 14px;
        line-height: 1;
        font-family: ProximaNova-Regular, "Helvetica Neue", Verdana, Arial, sans-serif;
        letter-spacing: 0.35px;
        margin: 0px;
        padding: 0px;
        border: 0px;
        vertical-align: baseline;
        position: relative;
        z-index: 9999;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        height: 150px;
        border-bottom: 1px solid rgb(242, 242, 242);
`

export const Navigation = styled.nav`
        font-size: 14px;
        z-index: 9999;
        line-height: 1;
        font-family: ProximaNova-Regular, "Helvetica Neue", Verdana, Arial, sans-serif;
        letter-spacing: 0.35px;
        margin: 25px;
        padding: 0px;
        border: 0px;
        vertical-align: baseline;
        position: relative;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        align-items: baseline;
        height: 20px;
`
export const NavMenuItem = styled.span`
        // font-size: 14px;
        line-height: 1;
        font-family: BerlinBold !important;
        // font-weight: bold;
        // letter-spacing: 0.35px;
        margin: 0px;
        padding: 0px;
        border: 0px;
        text-decoration: none;
        vertical-align: baseline;
        padding-bottom: 2px;
        color: black;
        text-transform: uppercase;
        opacity: 1;
        margin-bottom: 4px;
        margin: 6px 16px 4px;
        font-size: 0.928571rem;
        font-weight: bold;
        text-transform: uppercase;
        line-height: 17px;
        z-index: 100;
        cursor: pointer;
    }
`
export const CartContainer = styled.div`
        position: relative;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        height: 20px;
        background-color: rgb(254, 205, 47);
`
export const AppContainer = styled.div`
        background: white;
        width: 100%;
        display: flex;
        position: relative;
        top: 0px;
        left: 0px;
        flex-direction: column;
        min-height: 100vh;
        z-index: 30;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 27px 0px;
        will-change: transform;
`

export const LogoHolder = styled.div`
        font-size: 14px;
        line-height: 1;
        font-family: ProximaNova-Regular, "Helvetica Neue", Verdana, Arial, sans-serif;
        letter-spacing: 0.35px;
        margin-bottom: 10px;
        padding: 0px;
        border: 0px;
        vertical-align: baseline;
        position: relative;
        -webkit-box-pack: center;
        justify-content: center;
        display: flex;
        align-items: flex-start;
        height: 50px;
`

export const Heading1 = styled.h1`
        font-size: 1.5rem;
        text-align: center;
        line-height: 1;
        font-family: BerlinXBold;
        letter-spacing: 0.35px;
        margin: 15px 0;
        padding: 0px;
        border: 0px;
        vertical-align: baseline;
        padding-bottom: 2px;
        color: black;
        text-transform: uppercase;
        opacity: 1;     
`