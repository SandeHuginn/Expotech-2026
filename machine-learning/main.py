import numpy as np
from sklearn.ensemble import IsolationForest


def analisar_consumo(aparelho, consumos):
    # Organiza os consumos no formato esperado pelo Scikit-learn.
    dados = np.array(consumos).reshape(-1, 1)

    # Cria o modelo de detecção de anomalias.
    modelo = IsolationForest(
        contamination=0.15,
        random_state=42
    )

    # Treina o modelo com os dados recebidos.
    modelo.fit(dados)

    # Classifica os registros.
    resultados = modelo.predict(dados)

    # Armazena as possíveis anomalias encontradas.
    anomalias = []

    for indice, resultado in enumerate(resultados):
        if resultado == -1:
            anomalias.append({
                "dia": indice + 1,
                "consumoKwh": float(dados[indice][0]),
                "classificacao": "Possível anomalia"
            })

    # Monta o resultado da análise.
    return {
        "aparelho": aparelho,
        "quantidadeRegistros": len(consumos),
        "anomalias": anomalias
    }