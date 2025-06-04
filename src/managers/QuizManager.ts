import { Quiz } from "../Quiz";
import { IoManager } from "./IoManager";

export class QuizManager {
    private quizes: Quiz[];

    constructor() {
        this.quizes = [];
    }

    public addQuiz(quiz: Quiz) {
        this.quizes.push(quiz);
    }

    public removeQuiz(roomId: string) {
        this.quizes = this.quizes.filter(q => q.roomId !== roomId);
    }

    public start(roomId: string) {
        const quiz = this.quizes.find(x => x.roomId === roomId);
        if (!quiz) {
            console.error(`No quiz found for room ${roomId}`);
            return;
        }
        quiz.start();
    }

    public next(roomId: string) {
        const io = IoManager.getIo();
        io.to(roomId).emit("START_ROOM", {
            type: "START_ROOM",
        });
    }
}

