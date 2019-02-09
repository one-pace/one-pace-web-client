<?php
require_once 'RequestHeader.php';
require_once 'db_context.php';
include_once 'torrent_utils.php';
$torrents = TorrentUtils::getTorrents();
$context = new db_context();
$context->connect();
$episode = $context->read_episode($_GET['episode']);
$context->disconnect();

if($episode == null) {
	echo "Episode not found";
} else {
	$torrent = TorrentUtils::findTorrent($torrents, $episode["torrent_hash"]);
	if($torrent == null) {
		echo "Torrent with hash '" . $episode['torrent_hash'] . "' not found.";
	} else if (isset($_GET['magnet']) && $_GET['magnet'] == "true" && $torrent['magnet'] != null) {
		header("Location: " . $torrent['magnet']);
	} else {
		header("Location: https://onepace.net/torrents/" . $torrent["torrent_name"]);
	}
}
