import { useField } from 'formik';
import styled from 'styled-components';
import cn from 'classnames';

export interface ITextInputProps {
  name: string;
  label?: string;
  type: 'text' | 'email' | 'number';
  placeholder?: string;
}

const StyledTextInput = styled.div`
  margin: 0.5rem 0;
  .label {
    margin-right: 1rem;
  }
  .text-input {
    padding: 1rem;
    color: ${({ theme }) => theme.colors.text.dark};
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.base.line};
  }
  .error {
    border: 1px solid ${({ theme }) => theme.colors.primary.main};
    /* outline: none; */
  }
  .text-error {
    margin-top: 0.3rem;
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;

export const TextInput = ({ label, ...props }: ITextInputProps) => {
  const [field, meta] = useField(props);
  return (
    <StyledTextInput>
      {label && (
        <label className="label" htmlFor={props.name}>
          {label}
        </label>
      )}
      <input
        className={cn('text-input', { error: meta.error })}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="text-error">{meta.error}</div>
      ) : null}
    </StyledTextInput>
  );
};
