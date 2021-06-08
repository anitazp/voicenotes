import styled from "styled-components";


export const AnButton = styled.button `
text-align: center;
color: #000;
text-transform: capitalize;
font-weight: 600;
cursor: pointer;
display: inline-block;    
`
export const CtButton = styled(AnButton) `
  width: 130px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-right: 10px;
  margin-top: 10px;
  font-size: larger;
  background-color: transparent;
  color:  ${({status})=>status === "done" ? "#26ed14": status === "doing" ? "#fff400" : "#f80000"}; 
  border: 3px  solid ${({status})=>status === "done" ? "#26ed14": status === "doing" ? "#fff400" : "#f80000"};
  border-radius: 50px;
  &:hover {
     box-shadow: 0 0 20px 0 ${({status})=>status === "done" ? "#26ed14": status === "doing" ? "#fff400" : "#f80000"} inset, 0 0 20px 2px ${({status})=>status === "done" ? "#26ed14": status === "doing" ? "#fff400" : "#f80000"};;
  }
`

export const  CtDiv = styled(CtButton) `
   widt: 90%;
   padding-left: 10px;
   padding-right: 10px;
   margin-bottom: 10px;
   text-transform: capitalize;
   display: flex;
   justify-content: space-between;
   align-items: center;
   background-color: black;
`