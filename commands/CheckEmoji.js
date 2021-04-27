async function CheckEmoji(reaction) {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();

    if (reaction.emoji.name == '🇦'){
        return 'Monday';
    } else if (reaction.emoji.name == '🇧') {
        return 'Tuesday';
    } else if (reaction.emoji.name == '🇧') {
        return 'Tuesday';
    } else if (reaction.emoji.name == '🇨') {
        return 'Wednesday';
    } else if (reaction.emoji.name == '🇩') {
        return 'Thursday';
    } else if (reaction.emoji.name == '🇪') {
        return 'Friday';
    } else if (reaction.emoji.name == '🇫') {
        return 'Saturday Afternoon';
    } else if (reaction.emoji.name == '🇬') {
        return 'Saturday Night';
    } else if (reaction.emoji.name == '🇭') {
        return 'Sunday Afternoon';
    } else if (reaction.emoji.name == '🇮') {
        return 'Sunday Night';
    }
} 
module.exports = CheckEmoji;