import * as z from "zod"

export const step4Schema =
  z.object({

    ticketTypes:
      z.array(

        z.object({

          name:
            z.string()
              .min(
                2,
                "Nome do ingresso é obrigatório"
              ),

          description:
            z.string()
              .optional(),

          isVip:
            z.boolean()
              .default(
                false
              ),

          amenities:
            z.array(
              z.string()
            ).default([]),

          batches:
            z.array(

              z.object({

                name:
                  z.string()
                    .min(
                      2,
                      "Nome do lote é obrigatório"
                    ),

                price:
                  z.coerce
                    .number()
                    .min(
                      0,
                      "O preço não pode ser negativo"
                    ),

                totalQuantity:
                  z.coerce
                    .number()
                    .int(
                      "A quantidade deve ser um número inteiro"
                    )
                    .min(
                      1,
                      "Qtd mínima de 1 ingresso"
                    ),
              })

            ).min(
              1,
              "Deve haver pelo menos um lote"
            ),
        })

      ).min(
        1,
        "Crie pelo menos um tipo de ingresso"
      ),
  })