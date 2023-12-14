import mongoose from "mongoose";
const Userschema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 5,
    },
    picturePath: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    },
    followers: {
        type: Array,
        default: [],
    },
    coinWatchList: {
        type: Array,
        default: [],
        validate: [limitArray(20), "Cannot have more than 20 coins in watchlist"],
    },
    bio: String,
    impressions: Number,
}, {
    timestamps: true,
});
function limitArray(limit) {
    return function (value) {
        return value?.length <= limit;
    };
}
const User = mongoose.model("User", Userschema);
export default User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21vZGVscy9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUVoQyxNQUFNLFVBQVUsR0FBRyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQ3BDO0lBQ0UsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLE1BQU07UUFDWixRQUFRLEVBQUUsSUFBSTtRQUNkLEdBQUcsRUFBRSxDQUFDO1FBQ04sR0FBRyxFQUFFLEVBQUU7S0FDUjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLElBQUk7UUFDZCxHQUFHLEVBQUUsRUFBRTtRQUNQLE1BQU0sRUFBRSxJQUFJO0tBQ2I7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxJQUFJO1FBQ2QsR0FBRyxFQUFFLENBQUM7S0FDUDtJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxNQUFNO1FBQ1osT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxLQUFLO1FBQ1gsT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxLQUFLO1FBQ1gsT0FBTyxFQUFFLEVBQUU7S0FDWjtJQUNELGFBQWEsRUFBRTtRQUNiLElBQUksRUFBRSxLQUFLO1FBQ1gsT0FBTyxFQUFFLEVBQUU7UUFDWCxRQUFRLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsNkNBQTZDLENBQUM7S0FDMUU7SUFDRCxHQUFHLEVBQUUsTUFBTTtJQUNYLFdBQVcsRUFBRSxNQUFNO0NBQ3BCLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtDQUNqQixDQUNGLENBQUM7QUFFRixTQUFTLFVBQVUsQ0FBQyxLQUFhO0lBQy9CLE9BQU8sVUFBVSxLQUFTO1FBQ3hCLE9BQU8sS0FBSyxFQUFFLE1BQU0sSUFBSSxLQUFLLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBRWhELGVBQWUsSUFBSSxDQUFDIn0=