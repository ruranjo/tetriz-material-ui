/**import { useRef, useEffect } from 'react';

const useInterval = (callback: () => void, delay: number | null): void => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay == null) return;

    const intervalID = setInterval(() => callbackRef.current(), delay);
    return () => clearInterval(intervalID);
  }, [delay]);
}

export default useInterval;
 */



import { useRef, useEffect } from 'react';

// Definición del gancho personalizado useInterval
const useInterval = (callback: () => void, delay: number | null): void => {
  
  // useRef se utiliza para persistir el valor de la función de retorno de llamada entre renderizaciones.
  const callbackRef = useRef<() => void>(callback);

  // useEffect para actualizar la referencia de la función de retorno de llamada cuando cambia.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // useEffect para manejar la lógica del intervalo
  useEffect(() => {
    // Si el retraso es nulo, no se establece el intervalo
    if (delay == null) return;

    // Configurar el intervalo y ejecutar la función de retorno de llamada al expirar el tiempo
    const intervalID = setInterval(() => callbackRef.current(), delay);

    // Devolver una función de limpieza que detendrá el intervalo al desmontar el componente
    return () => clearInterval(intervalID);
  }, [delay]);
}

// Exportar el gancho personalizado useInterval
export default useInterval;
