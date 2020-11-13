import styled from '@emotion/styled'

export const Header = styled.header`
        font-size: 14px;
        line-height: 1;
        font-family: ProximaNova-Regular, "Helvetica Neue", Verdana, Arial, sans-serif;
        letter-spacing: 0.35px;
        margin: 0px;
        padding: 0px;
        border: 0px;
        vertical-align: baseline;
        position: relative;
        z-index: 30;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        height: 97px;
        border-bottom: 1px solid rgb(242, 242, 242);
`

export const Navigation = styled.nav`
        font-size: 14px;
        line-height: 1;
        font-family: ProximaNova-Regular, "Helvetica Neue", Verdana, Arial, sans-serif;
        letter-spacing: 0.35px;
        margin: 0px;
        padding: 0px;
        border: 0px;
        vertical-align: baseline;
        position: relative;
        display: flex;
        -webkit-box-pack: center;
        justify-content: center;
        height: 20px;
        
`
export const NavMenuItem = styled.span`
        font-size: 14px;
        line-height: 1;
        font-family: ProximaNova-Regular,"Helvetica Neue",Verdana,Arial,sans-serif;;
        letter-spacing: 0.35px;
        margin: 0px;
        padding: 0px;
        border: 0px;
        vertical-align: baseline;
        padding-bottom: 2px;
        color: black;
        text-transform: uppercase;
        opacity: 1;
    & > a {
        margin-bottom: 4px;
        margin: 6px 16px 4px;
        font-size: 0.928571rem;
        font-family: ProximaNova-Regular,"Helvetica Neue",Verdana,Arial,sans-serif;;
        font-weight: 300;
        text-transform: uppercase;
        line-height: 17px;
        
        &:hover{
            color: grey;
        }
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
        margin: 0px;
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
        font-family: ProximaNova-Regular,"Helvetica Neue",Verdana,Arial,sans-serif;;
        font-size: 1.6rem;
        font-weight: bolder;
        text-align: center;
        text-transform: uppercase;
        color: black;
        
`