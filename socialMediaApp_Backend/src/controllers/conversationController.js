import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Conversation } from "../models/conversationModel.js";


// create conversation

const createConversation = asyncHandler(async (req, res) => {
  const participants = req.body.participants;

  if (!participants) {
    throw new ApiError(403, "participants array is required");
  }

  const isValidIds = participants.every((id) =>
    mongoose.Types.ObjectId.isValid(id)
  );

  if (!isValidIds) {
    throw new ApiError(
      403,
      "One or more participant IDs are not valid ObjectIds"
    );
  }

  const participantIds = participants.map((id) =>
    mongoose.Types.ObjectId.createFromHexString(id)
  );

  const existingConversation = await Conversation.findOne({
    participants: {
      $all: participantIds,
    },
  }).populate({
    path: "participants",
    select: "username fullName profileImage",
  });

  if (existingConversation === null) {
    const conversation = await Conversation.create({
      participants: participants,
    });

    return res
      .status(201)
      .json(new ApiResponse(conversation, "conversation created successfully"));
  }

  return res
    .status(200)
    .json(new ApiResponse(existingConversation, "conversation already exists"));
});

// get conversation

const getConversation = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  if (!userId) {
    throw new ApiError(401, "user id is required in params");
  }
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(403, "userId is not a valid ObjectId");
  }


  const conversation = await Conversation.find({
    participants: userId,
    deletedBy: {
      $not: {
        $elemMatch: {
          userId: mongoose.Types.ObjectId.createFromHexString(userId),
        },
      },
    },
  });

  if (conversation.length <= 0) {
    return res
      .status(404)
      .json(new ApiResponse(null, "no conversation available"));
  }

  return res
    .status(200)
    .json(new ApiResponse(conversation, "all conversations received"));
});

// delete conversation

const deleteConversation = asyncHandler(async (req, res) => {
  const { conversationId, userId } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(conversationId) ||
    !mongoose.Types.ObjectId.isValid(userId)
  ) {
    throw new ApiError(403, "conversationId or userId is not a valid ObjectId");
  }

  const conversation = await Conversation.findById(conversationId);

  if (!conversation) {
    throw new ApiError(404, "no conversaton available");
  }

  const deletedByUser = conversation.deletedBy.some(
    (id) => id.userId.toString() === userId.toString()
  );

  if (!deletedByUser) {
    conversation.deletedBy.push({
      userId,
      deletedAt: new Date(),
    });

    await conversation.save();
  }

  const allParticipantsDeleted = conversation.participants.every(
    (participantId) =>
      conversation.deletedBy.some(
        (entry) => entry.userId.toString() === participantId.toString()
      )
  );
  console.log(allParticipantsDeleted);

  if (allParticipantsDeleted) {
    await Conversation.findByIdAndDelete(conversationId);
    return res
      .status(200)
      .json(new ApiResponse(null, "conversation fully deleted"));
  }

  return res
    .status(200)
    .json(new ApiResponse(null, "conversation marked as deleted by user "));
});

export { createConversation, getConversation, deleteConversation };
