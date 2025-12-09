import { useEffect, useRef } from "react";
import axios from "axios";

export default function GoogleLoginButton() {
  const btn = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.google && btn.current) {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: async (res: any) => {
          const id_token = res.credential;
          const result = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/google`,
            { token: id_token }
          );

          localStorage.setItem("token", result.data.token);
          window.location.href = "/";
        },
      });

      // @ts-ignore
      google.accounts.id.renderButton(btn.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, []);

  return <div ref={btn}></div>;
}
