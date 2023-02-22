import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {useState} from 'react';
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';

function Copyright(props: any) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

export default function Login(){
    const router = useRouter()
    const [signPage, setSignPage] = useState(false);

    const ClickSignUp = () => {
        router.push('./Signup')
    }
    
    return(
        <>
                <Container component="main" maxWidth="xs">
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
                                    <Typography component="h1" variant="h5"
                                    sx={{mb:2}}>
                                        로그인
                                    </Typography>

                                    <TextField
                                        label="아이디 입력"
                                        required
                                        fullWidth
                                        name="email"
                                        autoComplete='email'
                                        autoFocus
                                        sx={{mb:2}}
                                    />
                                    <span className={styles.text1}>아이디는 1234 입니다.</span>
                                    <TextField
                                        label="비밀번호 입력"
                                        type="password"
                                        required
                                        fullWidth
                                        name="password"
                                        autoComplete='current-password'
                                        sx={{mb:1}}
                                    />
                                    <span className={styles.text2}>비밀번호는 1234 입니다.</span>
                                    <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="아이디 저장"
                                    sx={{mr:34.5}}
                                    />

                                    <Button 
                                    type="submit" 
                                    fullWidth
                                    variant="contained"
                                    color="warning"
                                    sx={{ mt: 2, mb: 2 }}
                                    >로그인</Button>
                                
                            <Grid container>
                                <Grid item xs>
                                    
                                </Grid>
                                <Grid item>
                                    <button className={styles.signupac} onClick={ClickSignUp}>회원가입</button>
                                </Grid>
                            </Grid>
                        </Box>
                    <Copyright sx={{ mt: 8, mb: 4 }} />
                </Container>
 
        </>
    );
}