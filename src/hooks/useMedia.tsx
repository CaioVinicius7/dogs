import { useEffect, useState } from "react";

/**
 * @description Recebe uma media query como parâmetro e verifica se a medida atual da tela está de acordo com o parâmetro recebido
 * @param media EX: "(max-width: 640px)"
 * @returns Boolean
 * @example useMedia("(max-width: 640px)") => largura atual da tela < 640px ? true : false
 */

export function useMedia(media: string) {
  const [match, setMatch] = useState<boolean | null>(null);

  useEffect(() => {
    function changeMatch() {
      const { matches } = window.matchMedia(media);
      setMatch(matches);
    }

    changeMatch();

    window.addEventListener("resize", changeMatch);

    return () => {
      window.removeEventListener("resize", changeMatch);
    };
  }, [media]);

  return match;
}
