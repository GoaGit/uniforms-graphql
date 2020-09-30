import { useForm } from 'uniforms';

/**
 * helper function, eg. WithUniforms, that receives a context and passes it to the children
 * @param children
 * @returns children(context) with context the uniforms object
 */
const WithUniforms = ({ children }) => {
  const context = useForm();
  return children(context);
};

export default WithUniforms;
