#conectate a la api de  sping boot y obtiene datos de usuarios
import requests
import pandas as pd

#poner url de la api de spring boot

url = "http://localhost:8080/asistencias/"

# 1️⃣ Hacer la solicitud a la API

def obtenerDatosPorGrupo():

    response = requests.get(f"{url}Asistio")
    response1 = requests.get(f"{url}No_asistio")



    # 2️⃣ Verificar que la respuesta fue exitosa
    if response.status_code == 200 and response1.status_code == 200 :
        #unir las dos respuestas
        data1 = response1.json()
        data2 = response.json()
        data = data2 + data1
        # Convierte la respuesta JSON en un diccionario/lista
        # 3️⃣ Convertir directamente a DataFrame
        return  data
    else:
        print(f"Error {response.status_code}: no se pudo obtener la información")

def limpiezaDatos(df):
    # Eliminar filas con valores vacíos
    df = df.dropna()
    # Crear una copia explícita para evitar SettingWithCopyWarning
    df = df.copy()
    # Normalizar texto si la columna existe
    if 'estudianteNombre' in df.columns:
        # Asegurarse de que la columna sea tipo string antes de aplicar .str
        df.loc[:, 'estudianteNombre'] = df['estudianteNombre'].astype(str).str.strip().str.title()
    # Convertir columna a tipo correcto si existe
    if 'estado' in df.columns:
        # usar .loc para evitar asignaciones sobre vistas
        try:
            df.loc[:, 'estado'] = df['estado'].astype('category')
        except Exception:
            # si falla la conversión, mantenemos el valor original
            pass
    return df


#primera historia de usuario
# Mover la ejecución a un guardia main para que no se ejecute al importar el módulo
datos = obtenerDatosPorGrupo()
df = pd.DataFrame(datos)
df = limpiezaDatos(df)
# Mostrar un conteo de filas/columnas del DataFrame limpio
print(f"numero de datos{df.head()}")

# Calcular total de clases y asistencias por estudiante

asistencia = df.groupby("estudianteNombre").agg(total_clases=("estado", "count"),total_asistencias=("estado", lambda x: (x == "Asistio").sum()))

print(asistencia)

asistencia["porcentaje_asistencia"] = (asistencia["total_asistencias"] / asistencia["total_clases"] * 100).round(2)

print(asistencia)

#segunda histiria de usuario
