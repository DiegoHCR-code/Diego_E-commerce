import React from 'react';
import type { InputHTMLAttributes } from 'react';
import { StyledInput } from './Input.styles';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input: React.FC<InputProps> = (props) => <StyledInput {...props} />;

export default Input;
