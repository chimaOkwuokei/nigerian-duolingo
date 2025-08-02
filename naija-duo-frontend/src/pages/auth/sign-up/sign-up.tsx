import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../services/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";

// Zod schema
const signUpSchema = z.object({
  displayName: z.string().min(2, "Full Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  nativeLanguage: z.string().min(2, "Native Language is required"),
  learningLanguages: z.string().min(2, "Languages to Learn is required"),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const navigate = useNavigate();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      nativeLanguage: "",
      learningLanguages: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const { email, password, displayName, nativeLanguage, learningLanguages } = data;
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName });

      await setDoc(doc(db, "users", userCred.user.uid), {
        displayName,
        email,
        nativeLanguage,
        learningLanguages: learningLanguages.split(",").map(l => l.trim()),
        createdAt: serverTimestamp(),
      });

      navigate("/dashboard");
    } catch (error: any) {
      console.error(error.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Chima Okwuokei" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nativeLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Native Language</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Yoruba" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="learningLanguages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Languages to Learn</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Hausa, Igbo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#ffb703] hover:bg-[#fca311] text-white">
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}