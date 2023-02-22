import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link  href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function SignUp() {
    const router = useRouter()
    const theme = createTheme();

    const [check, setCheck] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordNew, setPaswordNew] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');

    let collectData: {
      email: string|null;
      name: string;
      password: string;
      rePassword: string;
    } 
    
    const handleSubmit = (e:any) => { // form 전송
      e.prevenDefault();
      // submit 태그 값 전송시 해당 페이지를 새로고침하는 기능
      // a 태그는 href에 연결된 링크로 해당 페이지 이동하는 기능
      // prevendefault는 이벤트 전파를 막아줌

    const data = new FormData(e.currentTarget);
    // FormData는 주로 회원가입 및 DB에 저장하는 페이지에 전송하기 위해 사용함.
    // currentTarget은 이벤트리스너를 가진 요소
    // Target은 이벤트가 발생한 요소
    
    // collectData = {
    //   email: data.get('email'),
    //   name: data.get('name'),
    //   password: data.get('password'),
    //   rePassword: data.get('rePassword'),
    // };

    const {email, name, password, rePassword} = collectData;

    const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    // if (!emailRegex.test(email)) {
    //   setEmailError('올바른 이메일 형식이 아닙니다.');
    // } else {
    //   setEmailError('');
    // }

    } 
    
    const handleAgree = (event:any) => { // 동의 체크
      setCheck(event.target.check);
    } 



  return (
    <ThemeProvider theme={theme}>```
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#42a5f5' }}>
            <GroupAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="name"
                  label="이름"
                  id="name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="email"
                  required
                  fullWidth
                  id="email"
                  label="아이디"
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="비밀번호"
                  name="password"
                  autoComplete="family-name"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="rePassword"
                  label="비밀번호 재입력"
                  name="rePassword"
                  autoComplete="family-name"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox onChange={handleAgree} color="primary" />}
                  label="회원가입에 동의합니다."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              sx={{ mt: 2, mb: 2 }}
              onClick={()=>{
                router.push('./Login')
              }}
            >
              회원가입
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}