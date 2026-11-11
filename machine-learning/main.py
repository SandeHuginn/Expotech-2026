
import numpy as np
from sklearn.ensemble import IsolationForest


def analisar_consumo(aparelho, consumos):
    if not isinstance(aparelho, str) or not aparelho.strip():
        raise ValueError("Nome do aparelho inválido.")

    if not isinstance(consumos, list) or len(consumos) < 5:
        raise ValueError(
            "Informe pelo menos 5 registros de consumo."
        )

    try:
        dados = np.asarray(consumos, dtype=float).reshape(-1, 1)
    except (ValueError, TypeError):
        raise ValueError("Os consumos devem ser numéricos.")

    if not np.isfinite(dados).all() or (dados < 0).any():
        raise ValueError(
            "Os consumos devem ser finitos e não negativos."
        )

    modelo = IsolationForest(
        contamination=0.15,
        random_state=42
    )

    modelo.fit(dados)
    resultados = modelo.predict(dados)

    anomalias = []

    for indice, resultado in enumerate(resultados):
        if resultado == -1:
            anomalias.append({
                "dia": indice + 1,
                "consumoKwh": float(dados[indice][0]),
                "classificacao": "Possível anomalia"
            })

    return {
        "aparelho": aparelho,
        "quantidadeRegistros": len(consumos),
        "anomalias": anomalias
    }
