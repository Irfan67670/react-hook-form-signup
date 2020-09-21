import React from "react";
import "./App.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

// Validation Schema using Yup
const Schema = yup.object().shape({
	username: yup.string().required("Forgot to put your username..?").min(5),
	age: yup.number().required("Could you please tell us your age?"),
	password: yup
		.string()
		.required("Do not let crackers break into your account!")
		.min(8),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref("password"), null], "Wait! Your password doesn't match.."),
});

function App() {
	/* Commented code below is deprecated (react-hook-form ver.5, the latest one is v6) */
	// const { handleSubmit, register, errors } = useForm({
	// 	validationSchema: Schema
	// });

	const { handleSubmit, register, errors } = useForm({
		resolver: yupResolver(Schema),
	});

	function onSubmit(formData) {
		console.log(formData);
	}

	console.log(errors);

	return (
		<>
			<h2>Sign Up Form</h2>
			<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				<label>Username</label>
				<input type="text" name="username" ref={register} />
				{errors.username && <p>{errors.username.message}</p>}

				<label>Age</label>
				<input type="number" name="age" ref={register} />
				{errors.age && <p>{errors.age.message}</p>}

				<label>Password</label>
				<input type="password" name="password" ref={register} />
				{errors.password && <p>{errors.password.message}</p>}

				<label>Confirm Your Password</label>
				<input type="password" name="confirmPassword" ref={register} />
				{errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

				<span>
					<input type="checkbox" name="remember" ref={register} />
					<label>Remember Me</label>
				</span>

				<button type="submit" className="btn">Sign Up for Free!</button>
			</form>
		</>
	);
}

export default App;
