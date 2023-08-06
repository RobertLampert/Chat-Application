import { createTheme } from '@mui/material/styles';
export default createTheme({
typography: {
useNextVariants: true
},
palette:{common:{black:"#000",white:"#fff"},
background:{paper:"#fff",default:"rgba(0, 0, 0, 0.42)"},
primary:{light:"#7986cb",main:"rgba(4, 66, 45, 0.89)",
dark:"#303f9f",contrastText:"#fff"},
secondary:{light:"#ff4081",main:"rgba(128, 0, 128, 1)",dark:"#c51162",contrastText:"#fff"},
error:{light:"#e57373",main:"rgba(172, 13, 0, 1)",dark:"#d32f2f",contrastText:"#fff"},
text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)",hint:"rgba(0, 0, 0, 0.38)"}}
});