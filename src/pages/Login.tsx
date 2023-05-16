import {
	Box,
	Button,
	CircularProgress,
	IconButton,
	InputAdornment,
	Paper,
	Typography
} from '@mui/material';
import { FC, useState } from 'react';
import { useNavigate } from '@tanstack/router';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import usePageTitle from '../hooks/usePageTitle';
import { useTranslation } from '../hooks/useTranslation';
import Form from '../components/library/form/Form';
import { FormTextField } from '../components/library/form/FormTextField';
import { signIn, signUp } from '../firebase';

type LoginValues = {
	email: string;
	password: string;
};

const Login = () => {
	const t = useTranslation();
	usePageTitle(t('login'));

	const navigate = useNavigate();

	const [isSignIn, setSignIn] = useState(true);
	const [submitError, setSubmitError] = useState<string>();
	const [submitLoading, setSubmitLoading] = useState<boolean>(false);

	const handleSubmit = async (values: Partial<LoginValues>) => {
		setSubmitLoading(true);
		if (!values.email || !values.password) {
			setSubmitError('Please fill in email and password.');
			return;
		}
		try {
			isSignIn
				? await signIn(values.email, values.password)
				: await signUp(values.email, values.password);
			navigate({ to: '/' });
		} catch (err) {
			setSubmitError(
				(err as { message?: string })?.message ?? 'Unknown error occurred'
			);
		}
		setSubmitLoading(false);
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Paper sx={{ display: 'flex', flexDirection: 'column', p: 4, gap: 2 }}>
				{isSignIn ? (
					<SignIn setSignIn={setSignIn} loading={submitLoading} />
				) : (
					<SignUp setSignIn={setSignIn} loading={submitLoading} />
				)}
				{submitError && (
					<Typography variant="caption" color="error.main">
						{submitError}
					</Typography>
				)}
			</Paper>
		</Form>
	);
};

type SignElementProps = {
	setSignIn: (arg0: boolean) => void;
	loading: boolean;
};

const SignIn: FC<SignElementProps> = ({ setSignIn, loading }) => {
	const t = useTranslation();
	return (
		<>
			<Typography variant="h4">{t('login.signIn')}</Typography>
			<Credentials />
			<Box display="flex" gap="20px" alignItems="center">
				<Typography>{t('login.signIn.question')}</Typography>
				<Button onClick={() => setSignIn(false)} sx={{ textTransform: 'none' }}>
					{t('login.signUp.here')}
				</Button>
			</Box>
			<Button
				variant="outlined"
				size="large"
				type="submit"
				disabled={loading}
				endIcon={loading && <CircularProgress size="20px" />}
			>
				{t('login.signIn')}
			</Button>
		</>
	);
};

const SignUp: FC<SignElementProps> = ({ setSignIn, loading }) => {
	const t = useTranslation();
	return (
		<>
			<Typography variant="h4">{t('login.signUp')}</Typography>
			<Credentials />
			<Box display="flex" gap="20px" alignItems="center">
				<Typography>{t('login.signUp.question')}</Typography>
				<Button onClick={() => setSignIn(true)} sx={{ textTransform: 'none' }}>
					{t('login.signIn.here')}
				</Button>
			</Box>

			<Button
				variant="outlined"
				size="large"
				type="submit"
				disabled={loading}
				endIcon={loading && <CircularProgress size="20px" />}
			>
				{t('login.signUp')}
			</Button>
		</>
	);
};

const Credentials = () => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword(show => !show);

	return (
		<Box display="flex" flexDirection="column" gap="20px" width="400px">
			<FormTextField name="email" label="Email" type="email" required />
			<FormTextField
				name="password"
				label="Password"
				type={showPassword ? 'text' : 'password'}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								onMouseDown={e => e.preventDefault()}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
		</Box>
	);
};
export default Login;
