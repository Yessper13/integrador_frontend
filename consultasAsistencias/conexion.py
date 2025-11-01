"""
Informe de Asistencias - Generado automáticamente desde API de Spring Boot
Autor: Esteban Zapata
Descripción:
    Genera un informe completo en PDF con datos de asistencia, inasistencia,
    estadísticas, gráficos y conclusiones.
"""

import requests
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime
from matplotlib.backends.backend_pdf import PdfPages
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, PageBreak


# =====================================
# 🔹 CONFIGURACIÓN INICIAL
# =====================================
API_URL = "http://localhost:8080/asistencias/"


# =====================================
# 🔹 FUNCIONES DE OBTENCIÓN Y LIMPIEZA
# =====================================
def obtener_datos_api():
    """Obtiene datos de asistencias desde la API de Spring Boot."""
    endpoints = ["Asistio", "No_asistio"]
    data = []

    for ep in endpoints:
        response = requests.get(f"{API_URL}{ep}")
        if response.status_code == 200:
            data.extend(response.json())
        else:
            print(f"⚠ Error {response.status_code} al obtener {ep}")

    return data


def limpiar_datos(df):
    """Limpia y normaliza los datos obtenidos."""
    df = df.dropna().copy()

    if "estudianteNombre" in df.columns:
        df["estudianteNombre"] = (
            df["estudianteNombre"].astype(str).str.strip().str.title()
        )

    if "estado" in df.columns:
        df["estado"] = df["estado"].astype("category")

    return df


# =====================================
# 🔹 FUNCIONES DE CÁLCULO
# =====================================
def calcular_asistencia(df):
    """Calcula el porcentaje de asistencia por estudiante."""
    asistencia = df.groupby("estudianteNombre").agg(
        total_clases=("estado", "count"),
        total_asistencias=("estado", lambda x: (x == "Asistio").sum())
    )
    asistencia["porcentaje_asistencia"] = (
        (asistencia["total_asistencias"] / asistencia["total_clases"]) * 100
    ).round(2)
    return asistencia


def calcular_inasistencias(df):
    """Calcula los estudiantes con más de 3 inasistencias."""
    inasistencia = df.groupby("estudianteNombre").agg(
        total_clases=("estado", "count"),
        total_inasistencias=("estado", lambda x: (x == "No_asistio").sum())
    )
    return inasistencia[inasistencia["total_inasistencias"] >= 3]


def calcular_estadisticas(asistencia):
    """Calcula medidas estadísticas básicas."""
    return {
        "Media": asistencia["porcentaje_asistencia"].mean(),
        "Mediana": asistencia["porcentaje_asistencia"].median(),
        "Moda": asistencia["porcentaje_asistencia"].mode()[0],
        "Desviación Estándar": asistencia["porcentaje_asistencia"].std(),
        "Varianza": asistencia["porcentaje_asistencia"].var(),
    }


# =====================================
# 🔹 FUNCIONES DE GRÁFICOS
# =====================================
def generar_graficos(asistencia, inasistencia):
    """Genera las gráficas y las guarda como imágenes temporales."""
    graficos = []

    # Ajuste de estilo general
    plt.style.use("ggplot")

    # =========================
    # 📊 Gráfico de barras - Asistencia
    # =========================
    fig1, ax1 = plt.subplots(figsize=(10, 5))
    asistencia.plot(kind="bar", y="porcentaje_asistencia", legend=False, ax=ax1, color="skyblue")
    ax1.set_title("Porcentaje de Asistencia por Estudiante", fontsize=14, fontweight="bold")
    ax1.set_xlabel("Estudiante")
    ax1.set_ylabel("Porcentaje (%)")
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    img1 = "grafico_asistencia.png"
    plt.savefig(img1, dpi=300, bbox_inches="tight")
    graficos.append(img1)

    # =========================
    # 🥧 Gráfico de pastel
    # =========================
    fig2, ax2 = plt.subplots(figsize=(6, 6))
    asistencia["porcentaje_asistencia"].plot(
        kind="pie",
        autopct="%1.1f%%",
        ax=ax2,
        startangle=90,
        colors=plt.cm.Pastel1.colors
    )
    ax2.set_ylabel("")
    ax2.set_title("Distribución del Porcentaje de Asistencia", fontsize=14, fontweight="bold")
    plt.tight_layout()
    img2 = "grafico_pie_asistencia.png"
    plt.savefig(img2, dpi=300, bbox_inches="tight")
    graficos.append(img2)

    # =========================
    # 📉 Gráfico de barras - Inasistencias
    # =========================
    fig3, ax3 = plt.subplots(figsize=(10, 5))
    inasistencia.plot(kind="bar", y="total_inasistencias", color="salmon", ax=ax3, legend=False)
    ax3.set_title("Inasistencias por Estudiante (≥3)", fontsize=14, fontweight="bold")
    ax3.set_xlabel("Estudiante")
    ax3.set_ylabel("Total de Inasistencias")
    plt.xticks(rotation=45, ha="right")
    plt.tight_layout(rect=[0, 0, 1, 0.95])
    img3 = "grafico_inasistencia.png"
    plt.savefig(img3, dpi=300, bbox_inches="tight")
    graficos.append(img3)

    plt.close("all")
    return graficos



# =====================================
# 🔹 FUNCIÓN: GENERAR INFORME PDF
# =====================================
def generar_informe(asistencia, inasistencia, stats, graficos):
    """Crea el informe completo en formato PDF con portada, tablas y gráficos."""
    doc = SimpleDocTemplate("informe_asistencias.pdf", pagesize=A4)
    story = []
    styles = getSampleStyleSheet()

    # Portada
    story.append(Paragraph("<b>Informe de Asistencias</b>", styles["Title"]))
    story.append(Spacer(1, 20))
    story.append(Paragraph(f"Autor: <b>Esteban Zapata,Juan Esteban Gaviria, Brando Perez</b>", styles["Normal"]))
    story.append(Paragraph(f"Fecha: {datetime.now().strftime('%d/%m/%Y')}", styles["Normal"]))
    story.append(Spacer(1, 50))
    story.append(Paragraph("Sistema de análisis de asistencias basado en API Spring Boot", styles["Italic"]))
    story.append(PageBreak())

    # Índice
    story.append(Paragraph("<b>Índice</b>", styles["Heading1"]))
    story.append(Paragraph("1. Tabla de Asistencia", styles["Normal"]))
    story.append(Paragraph("2. Estudiantes con Inasistencias", styles["Normal"]))
    story.append(Paragraph("3. Estadísticas Descriptivas", styles["Normal"]))
    story.append(Paragraph("4. Gráficos", styles["Normal"]))
    story.append(Paragraph("5. Conclusiones", styles["Normal"]))
    story.append(PageBreak())

    # Sección 1: Tabla de Asistencia
    story.append(Paragraph("<b>1. Tabla de Asistencia</b>", styles["Heading1"]))
    data = [asistencia.reset_index().columns.tolist()] + asistencia.reset_index().values.tolist()
    table = Table(data)
    table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), colors.grey),
                               ("TEXTCOLOR", (0, 0), (-1, 0), colors.whitesmoke),
                               ("ALIGN", (0, 0), (-1, -1), "CENTER"),
                               ("GRID", (0, 0), (-1, -1), 0.5, colors.black)]))
    story.append(table)
    story.append(PageBreak())

    # Sección 2: Inasistencias
    story.append(Paragraph("<b>2. Estudiantes con Inasistencias (>=3)</b>", styles["Heading1"]))
    data2 = [inasistencia.reset_index().columns.tolist()] + inasistencia.reset_index().values.tolist()
    table2 = Table(data2)
    table2.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
                                ("GRID", (0, 0), (-1, -1), 0.5, colors.black)]))
    story.append(table2)
    story.append(PageBreak())

    # Sección 3: Estadísticas
    story.append(Paragraph("<b>3. Estadísticas Descriptivas</b>", styles["Heading1"]))
    for k, v in stats.items():
        story.append(Paragraph(f"{k}: <b>{v:.2f}</b>", styles["Normal"]))
    story.append(PageBreak())

    # Sección 4: Gráficos
    story.append(Paragraph("<b>4. Gráficos</b>", styles["Heading1"]))
    for g in graficos:
        story.append(Image(g, width=400, height=250))
        story.append(Spacer(1, 20))
    story.append(PageBreak())

    # Sección 5: Conclusiones
    story.append(Paragraph("<b>5. Conclusiones</b>", styles["Heading1"]))
    story.append(Paragraph("""
        El análisis evidencia el comportamiento de asistencia de los estudiantes.
        Aquellos con porcentajes menores al promedio requieren seguimiento.
        La media y varianza muestran la consistencia general de la asistencia.
        Este reporte facilita la toma de decisiones académicas basadas en datos.
    """, styles["Normal"]))

    # Generar PDF
    doc.build(story)
    print("✅ Informe completo generado: 'informe_asistencias.pdf'")


# =====================================
# 🔹 FUNCIÓN PRINCIPAL
# =====================================
def main():
    datos = obtener_datos_api()
    if not datos:
        print("❌ No se obtuvieron datos de la API.")
        return

    df = limpiar_datos(pd.DataFrame(datos))
    asistencia = calcular_asistencia(df)
    inasistencia = calcular_inasistencias(df)
    stats = calcular_estadisticas(asistencia)
    graficos = generar_graficos(asistencia, inasistencia)
    generar_informe(asistencia, inasistencia, stats, graficos)


# =====================================
# 🔹 EJECUCIÓN
# =====================================
if __name__ == "__main__":
    main()

